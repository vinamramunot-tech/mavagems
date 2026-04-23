import re
import sys

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # 1. Replace tailwind config script
    content = re.sub(
        r'<script id="tailwind-config">.*?</script>',
        '<script src="tailwind-config.js"></script>',
        content,
        flags=re.DOTALL
    )

    # 2. Replace style tags (only the ones in the head)
    # Be careful not to replace anything else.
    content = re.sub(
        r'<style>.*?</style>',
        '<link rel="stylesheet" href="styles.css">',
        content,
        flags=re.DOTALL
    )

    # 3. Replace the inline script at the end of the body
    # We look for the last <script>...</script> before </body>
    content = re.sub(
        r'<script>(?!.*<script>).*?</script>\n*(?=</body>)',
        '<script src="scripts.js"></script>\n',
        content,
        flags=re.DOTALL
    )

    with open(filename, 'w') as f:
        f.write(content)

for file in ['index.html', 'about-us.html', 'contact-us.html', 'manufacturing.html']:
    update_file(file)
    print(f'Updated {file}')

