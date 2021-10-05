export function rundStrCreate(keta: number) {
  // 生成する文字列の長さ
  const l = keta;
  // 生成する文字列に含める文字セット
  const c = "abcdefghijklmnopqrstuvwxyz0123456789";
  const cl = c.length;

  let r:string = "";
  for(let i=0; i < l; i++){
      r += c[Math.floor(Math.random()*cl)];
  }
  return r;
}