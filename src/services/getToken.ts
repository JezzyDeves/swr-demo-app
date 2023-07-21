export async function getToken() {
  let tokenCall = await fetch("/api/token", { method: "POST" });
  let token: string = await tokenCall.json();
  return token;
}
