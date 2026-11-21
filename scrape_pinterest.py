import urllib.request
import re
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

queries = ['kebaya+modern+wisuda', 'kebaya+kutubaru+aesthetic', 'kebaya+lamaran+kondangan', 'kebaya+brokat+pastel']

all_images = set()

for q in queries:
    url = f'https://www.pinterest.com/search/pins/?q={q}'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            html = response.read().decode('utf-8', errors='ignore')
            # Look for i.pinimg.com links
            found = re.findall(r'https://i\.pinimg\.com/[0-9a-zA-Z/_.-]+\.(?:jpg|png|webp)', html)
            for f in found:
                # We want 474x or 736x or originals
                if any(x in f for x in ['236x', '474x', '564x', '736x', 'originals']):
                    # convert to high-res 736x
                    high_res = re.sub(r'/(?:236x|474x|564x)/', '/736x/', f)
                    all_images.add(high_res)
    except Exception as e:
        print(f"Error querying {q}: {e}")

print(f"Total aesthetic Pinterest images found: {len(all_images)}")
images_list = list(all_images)
for i, img in enumerate(images_list[:25]):
    print(f"[{i}] {img}")

# Test download first 10
os.makedirs('kebaya-app/public/images/pinterest', exist_ok=True)
downloaded = []
for i, img_url in enumerate(images_list):
    if len(downloaded) >= 16:
        break
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as res:
            data = res.read()
            if len(data) > 25000: # ensure it's a real high-res photo, not an icon
                filename = f'kebaya-app/public/images/pinterest/kebaya_{len(downloaded)+1:02d}.jpg'
                with open(filename, 'wb') as f:
                    f.write(data)
                downloaded.append(filename)
                print(f"Downloaded {filename} ({len(data)} bytes) from {img_url}")
    except Exception as e:
        print(f"Failed {img_url}: {e}")

print(f"Successfully downloaded {len(downloaded)} Pinterest kebaya photos!")
