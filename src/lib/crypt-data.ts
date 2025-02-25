import crypto from "node:crypto";

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY || "", "base64");

if (key.length !== 32) {
  throw new Error("La clave de encriptación debe tener 32 bytes.");
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(encryptedText: string): string {
  const [ivHex, encryptedData] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}
