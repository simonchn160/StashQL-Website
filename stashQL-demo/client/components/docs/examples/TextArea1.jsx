import React from 'react';

const TextArea1 = () => {
  const docCodeBlockSyntax = `const StashQL = new stashql(schema, redisCache, 1000);`
  return (
    <div id="textarea">
      <div id="doc-code-block">
        <span style={{color:"#ffc91e"}}>stashql</span>(schema, cache, ttl);
      </div>
    </div>
  );
};
export default TextArea1;

// rgb(197, 165, 197);
// rgb(141, 200, 145);
// rgb(121, 182, 242);
// rgb(252, 146, 158);
// rgb(250, 200, 99);