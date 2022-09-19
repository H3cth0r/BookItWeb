import os
# Requirement to install

print("Opening environment")
print("==========================")
os.system("python3 -m pipreqs.pipreqs --force ./server")

print("Generating requirements file")
print("==========================")
os.system("python3 -m pipreqs.pipreqs --force ./server")

print("Installing requierements")
print("==========================")
os.system("pip3 install -r ./server/requirements.txt")

print("Setting up database")
print("==========================")
os.system("python3 ./server/setupDB.py")
