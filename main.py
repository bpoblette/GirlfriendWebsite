import subprocess

def main():
  love = False
  while(not love):
    answer = input("Do you love me? type yes or no: ")
    if(answer == "yes"):
      love = True
    else:
      print("You're so silly 😛")

if __name__ == "__main__":
  main()