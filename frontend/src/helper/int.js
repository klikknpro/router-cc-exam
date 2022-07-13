// const string = "CBDEFGABEKXF";
const string = "lolAbdfgAChe";
const str = string.split("");

let result = [];
let res = [];
for (let i = 0; i < str.length; i++) {
  for (let j = i + 1; j < str.length; j++) {
    if (str[i] === str[j]) {
      result.push(j - i);
      res.push(string.substring(i, j));
    }
  }
}

console.log(res);

let longest = res[0];
for (const word of res) {
  if (word.length > longest.length) longest = word;
}

console.log(longest);

/*
So the first thing you want to be able to do is to identify a problem that uses a sliding window paradigm. Luckily, there are some common giveaways:


-The problem will involve a data structure that is ordered and iterable like an array or a string

-You are looking for some subrange in that array/string, like a longest, shortest or target value.

-There is an apparent naive or brute force solution that runs in O(N²), O(2^N) or some other large time complexity.

-But the biggest giveaway is that
*/
