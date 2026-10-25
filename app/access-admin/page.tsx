import { requireChatGPTUser } from "../chatgpt-auth";
import AdminClient from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AccessAdminPage() {
  const user = await requireChatGPTUser("/access-admin");
  const allowed = process.env.ACCESS_ADMIN_EMAIL?.toLowerCase() === user.email.toLowerCase();
  if (!allowed) return <main style={{ padding: 48 }}><h1>접근 권한 없음</h1><p>이 Site의 등록코드 관리자 계정으로 로그인해 주세요.</p></main>;
  return <AdminClient />;
}
