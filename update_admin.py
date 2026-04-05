import os
import re

files_to_update = [
    'frontend/src/pages/Admin/AdminDashboard.jsx',
    'frontend/src/pages/Admin/AddProduct.jsx',
    'frontend/src/pages/Admin/EditProduct.jsx'
]

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('gray-', 'slate-')
    content = content.replace('rounded-lg shadow', 'rounded-3xl shadow-sm border border-slate-100')
    content = content.replace('rounded-lg', 'rounded-xl')
    content = content.replace('<div className="min-h-screen bg-slate-50">', '<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">')
    content = content.replace('<div className="container mx-auto', '<main className="flex-grow container mx-auto')
    
    if 'AdminDashboard.jsx' in file_path:
        content = re.sub(r'</div>\s*</div>\s*</div>\s*\);\s*};', '</div>\n      </main>\n\n      <Footer />\n    </div>\n  );\n};\n', content)
    else:
        content = re.sub(r'</div>\s*</div>\s*\);\s*};', '</div>\n      </main>\n\n      <Footer />\n    </div>\n  );\n};\n', content)
    
    if 'import Footer' not in content:
        content = re.sub(r'(import Navbar from [^;]+;)', r'\1\nimport Footer from "../../components/Layout/Footer";', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file_path}")
