const fs = require('fs');
const path = require('path');

const files = [
  'frontend/src/pages/Admin/AdminDashboard.jsx',
  'frontend/src/pages/Admin/AddProduct.jsx',
  'frontend/src/pages/Admin/EditProduct.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if(!fs.existsSync(filePath)) {
    console.log('Not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Apply our style changes
  content = content
    .replace(/gray-/g, 'slate-')
    .replace(/rounded-lg shadow/g, 'rounded-3xl shadow-sm border border-slate-100')
    .replace(/rounded-lg/g, 'rounded-xl')
    .replace(/<div className="min-h-screen bg-slate-50">/g, '<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">')
    .replace(/<div className="container mx-auto/g, '<main className="flex-grow container mx-auto');
    
  if (file.includes('AdminDashboard.jsx')) {
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\);\s*};/g, '</div>\n      </main>\n\n      <Footer />\n    </div>\n  );\n};\n');
  } else if (file.includes('AddProduct.jsx') || file.includes('EditProduct.jsx')) {
     content = content.replace(/<\/div>\s*<\/div>\s*\);\s*};/g, '</div>\n      </main>\n\n      <Footer />\n    </div>\n  );\n};\n');
  }
  
  if (!content.includes('import Footer')) {
    content = content.replace(/(import Navbar from [^;]+;)/, '$1\nimport Footer from "../../components/Layout/Footer";');
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated ' + filePath);
});
