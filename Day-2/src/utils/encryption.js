const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

function encrypt(text) {
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString("hex"),
        content: encrypted,
        authTag: authTag.toString("hex")
    };
}

function decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(encryptedData.iv, "hex")
    );

    decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));

    let decrypted = decipher.update(encryptedData.content, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

module.exports = { encrypt, decrypt };