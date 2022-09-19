import os
# Requirement to install


print("Installing requierements")
print("==========================")
os.system("pip3 install -r ./server/requirements.txt")

print("Setting up database")
print("==========================")
os.system("python3 ./server/setupDB.py")
