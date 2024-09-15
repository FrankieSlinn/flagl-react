function murmurHash3(dateInputForSeed) {
    let i = 0;
    let hash = 0;
    // XOR the dateInputForSeed with an initial hash value
    hash = 1779033703 ^ dateInputForSeed.length;
  
    // Loop through each character in the dateInputForSeed
    for (i; i < dateInputForSeed.length; i++) {
      // XOR the current hash with the current character's ASCII code
      let bitwise_xor_from_character = hash ^ dateInputForSeed.charCodeAt(i);
  
      // Perform multiplication and bit-shifting operations
      hash = Math.imul(bitwise_xor_from_character, 3432918353);
      hash = (hash << 13) | (hash >>> 19);
    }
    return () => {
      // This returns a closure that can be used as a pseudo-random number generator (PRNG) with the computed hash as the dateInputForSeed.
      hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
      hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
      return (hash ^= hash >>> 16) >>> 0; // Ensure the result is a positive integer
    };
  }
  
  function generateRandomNumber(seed_1, seed_2, seed_3, seed_4) {
    return () => {
      // Ensure that the seed values are treated as unsigned 32-bit integers
      seed_1 >>>= 0;
      seed_2 >>>= 0;
      seed_3 >>>= 0;
      seed_4 >>>= 0;
  
      // Combine seed_1 and seed_2, then cast it to a signed 32-bit integer
      let cast32 = (seed_1 + seed_2) | 0;
  
      // Update seed_1 by applying bitwise operations
      seed_1 = seed_2 ^ (seed_2 >>> 9);
  
      // Update seed_2 by applying bitwise and addition operations
      seed_2 = (seed_3 + (seed_3 << 3)) | 0;
  
      // Update seed_3 by applying bitwise shift operations
      seed_3 = (seed_3 << 21) | (seed_3 >>> 11);
  
      // Increment seed_4
      seed_4 = (seed_4 + 1) | 0;
  
      // Combine cast32 and seed_4, then cast it to an unsigned 32-bit integer
      cast32 = (cast32 + seed_4) | 0;
  
      // Update seed_3 by combining it with cast32
      seed_3 = (seed_3 + cast32) | 0;
  
      // Return a pseudo-random number between 0 (inclusive) and 1 (exclusive)
      return (cast32 >>> 0) / 4294967296;
    };
  }
  export{
    murmurHash3,
    generateRandomNumber,
  }