import bcrypt from "bcrypt";

const saltRounds = 10; //Rounds para o salt

export async function hash(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

export async function compareHash(
  provided: string,
  stored: string
): Promise<boolean> {
  return await bcrypt.compare(provided, stored);
}
