const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = docx;

const mdPath = path.join(__dirname, '..', 'giao-trinh-qtrr', 'GiaoTrinh_QuanTriRuiRo_ThS_NguyenThiTrucPhuong_HoanThien.md');
const outDocxPath = path.join(__dirname, '..', 'giao-trinh-qtrr', 'GiaoTrinh_QuanTriRuiRo_ThS_NguyenThiTrucPhuong_HoanThien.docx');

const mdContent = fs.readFileSync(mdPath, 'utf8');
const lines = mdContent.split('\n');

const docChildren = [];

let inCode = false;
let codeBuf = [];
let inTable = false;
let tableRows = [];

function parseRuns(text) {
  // Simple bold and regular text parser
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  const runs = [];
  parts.forEach(p => {
    if (!p) return;
    if (p.startsWith('**') && p.endsWith('**')) {
      runs.push(new TextRun({ text: p.slice(2, -2), bold: true, font: 'Times New Roman', size: 24 }));
    } else if (p.startsWith('*') && p.endsWith('*')) {
      runs.push(new TextRun({ text: p.slice(1, -1), italics: true, font: 'Times New Roman', size: 24 }));
    } else {
      runs.push(new TextRun({ text: p, font: 'Times New Roman', size: 24 }));
    }
  });
  return runs;
}

function flushTable() {
  if (inTable && tableRows.length > 0) {
    const docRows = tableRows.map((row, rIdx) => {
      const cells = row.map(c => {
        return new TableCell({
          children: [new Paragraph({ children: parseRuns(c.trim()) })],
          shading: rIdx === 0 ? { fill: '742D3A' } : (rIdx % 2 === 0 ? { fill: 'FFFFFF' } : { fill: 'F8FAFC' }),
        });
      });
      return new TableRow({ children: cells });
    });
    docChildren.push(new Table({
      rows: docRows,
      width: { size: 100, type: WidthType.PERCENTAGE }
    }));
    docChildren.push(new Paragraph({ text: '' }));
    inTable = false;
    tableRows = [];
  }
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Code block
  if (line.startsWith('```')) {
    flushTable();
    if (inCode) {
      const codeText = codeBuf.join('\n');
      docChildren.push(new Paragraph({
        children: [new TextRun({ text: codeText, font: 'Consolas', size: 18 })],
        shading: { fill: 'F1F5F9' },
        spacing: { before: 120, after: 120 }
      }));
      codeBuf = [];
      inCode = false;
    } else {
      inCode = true;
    }
    continue;
  }
  if (inCode) {
    codeBuf.push(lines[i]);
    continue;
  }

  // Table
  if (line.startsWith('|') && line.endsWith('|')) {
    const cells = line.slice(1, -1).split('|');
    const isSep = cells.every(c => /^[\s\-:]+$/.test(c));
    if (isSep) continue;
    inTable = true;
    tableRows.push(cells);
    continue;
  } else {
    flushTable();
  }

  if (!line) {
    continue;
  }

  if (line === '---' || line === '***') {
    docChildren.push(new Paragraph({
      border: { bottom: { color: 'A60018', space: 1, value: BorderStyle.SINGLE, size: 12 } },
      spacing: { before: 200, after: 200 }
    }));
    continue;
  }

  // Headings
  if (line.startsWith('# ')) {
    docChildren.push(new Paragraph({
      children: [new TextRun({ text: line.substring(2), bold: true, color: 'A60018', font: 'Times New Roman', size: 32 })],
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 180 }
    }));
    continue;
  }
  if (line.startsWith('## ')) {
    docChildren.push(new Paragraph({
      children: [new TextRun({ text: line.substring(3), bold: true, color: '742D3A', font: 'Times New Roman', size: 28 })],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 280, after: 140 }
    }));
    continue;
  }
  if (line.startsWith('### ')) {
    docChildren.push(new Paragraph({
      children: [new TextRun({ text: line.substring(4), bold: true, color: '0F172A', font: 'Times New Roman', size: 26 })],
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 }
    }));
    continue;
  }
  if (line.startsWith('#### ')) {
    docChildren.push(new Paragraph({
      children: [new TextRun({ text: line.substring(5), bold: true, color: '334155', font: 'Times New Roman', size: 24 })],
      heading: HeadingLevel.HEADING_4,
      spacing: { before: 160, after: 80 }
    }));
    continue;
  }
  if (line.startsWith('##### ')) {
    docChildren.push(new Paragraph({
      children: [new TextRun({ text: line.substring(6), bold: true, color: '475569', font: 'Times New Roman', size: 24 })],
      heading: HeadingLevel.HEADING_5,
      spacing: { before: 120, after: 60 }
    }));
    continue;
  }

  // Blockquote / Callout
  if (line.startsWith('> ')) {
    docChildren.push(new Paragraph({
      children: parseRuns(line.substring(2)),
      shading: { fill: 'FFF9EC' },
      border: { left: { color: 'F2C45D', space: 4, value: BorderStyle.SINGLE, size: 24 } },
      spacing: { before: 120, after: 120 }
    }));
    continue;
  }

  // Bullet list
  if (line.startsWith('* ') || line.startsWith('- ')) {
    docChildren.push(new Paragraph({
      children: parseRuns(line.substring(2)),
      bullet: { level: 0 },
      spacing: { before: 40, after: 40 }
    }));
    continue;
  }

  // Regular paragraph
  docChildren.push(new Paragraph({
    children: parseRuns(line),
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 60, line: 320 }
  }));
}

flushTable();

const doc = new Document({
  title: 'Giáo Trình Quản Trị Rủi Ro — ThS. Nguyễn Thị Trúc Phương',
  description: 'Biên soạn hoàn chỉnh theo tài liệu gốc HCE',
  creator: 'ThS. Nguyễn Thị Trúc Phương',
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch / 2.54 cm
      }
    },
    children: docChildren
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outDocxPath, buffer);
  console.log('Saved Word DOCX textbook:', outDocxPath);
  console.log('DOCX size:', buffer.byteLength, 'bytes');
}).catch(err => {
  console.error('Error generating DOCX:', err);
});
