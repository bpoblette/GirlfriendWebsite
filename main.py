import subprocess

def main():
  love = False
  while(not love):
    answer = input("Do you love me? type yes or no: ")
    if(answer == "yes"):
      love = True
      try:
        process = subprocess.Popen(["node index.js"], shell=True)
        process.wait()
      except Exception as e:
        print(f"An error occurred: {e}")
    else:
      print("You're so silly 😛")

if __name__ == "__main__":
  main()
  