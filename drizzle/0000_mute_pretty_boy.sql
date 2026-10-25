CREATE TABLE `access_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code_hash` text NOT NULL,
	`product` text NOT NULL,
	`expires_at` integer NOT NULL,
	`max_activations` integer DEFAULT 2 NOT NULL,
	`activation_count` integer DEFAULT 0 NOT NULL,
	`source_provider` text NOT NULL,
	`source_reference` text NOT NULL,
	`buyer_email` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `access_codes_code_hash_unique` ON `access_codes` (`code_hash`);--> statement-breakpoint
CREATE TABLE `access_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`code_id` integer NOT NULL,
	`product` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`code_id`) REFERENCES `access_codes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `purchase_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product` text NOT NULL,
	`provider` text NOT NULL,
	`reference` text NOT NULL,
	`buyer_email` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`issued_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `purchase_provider_reference` ON `purchase_requests` (`provider`,`reference`);