import tesseract from "tesseract.js";
import sharp from "sharp";

export async function processMarksheet(imagePath) {
  const processedPath = imagePath.replace(/(\.\w+)$/, '_pre$1');
  await sharp(imagePath)
    .resize(2000)
    .grayscale()
    .normalize()
    .sharpen()
    .threshold(130)
    .toFile(processedPath);

  const { data: { text } } = await tesseract.recognize(processedPath);

  const regNo = text.match(/Reg(?:istration)?\s*No\.?\s*[:\-]?\s*(\w+)/i)?.[1];
  const emisId = text.match(/EMIS\s*(?:ID)?\s*[:\-]?\s*([A-Za-z0-9]+)/i)?.[1];
  const cgpa = text.match(/CGPA\s*[:\-]?\s*([0-9]+\.[0-9]+)/i)?.[1];

  const subjects = [];
  for (let line of text.split('\n')) {
    const res = line.match(/([A-Z]{2,}\d+)\s+([a-zA-Z .,-]+)\s+([A-F][A]?|\bRA\b|\bF\b)/i);
    if (res) subjects.push({ code: res[1], name: res[2].trim(), grade: res[3].trim() });
  }
  const arrears = subjects.filter(sub => /^(F|RA)$/i.test(sub.grade));
  return { regNo, emisId, cgpa, subjects, arrears };
}
