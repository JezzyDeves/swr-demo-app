export default async function createMember(name: { name: string }) {
  const member: { name: string; address: string; job: string } = await (
    await fetch("/api/member", { method: "POST", body: JSON.stringify(name) })
  ).json();

  return member;
}
