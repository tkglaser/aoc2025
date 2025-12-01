start
  = h:instruction t:(eol instruction)* { return [h, ...t.map(item => item[1])] }

instruction
  = d:direction s:int { return { direction: d, steps: s } }

direction
  = [LR]

int "integer"
  = [0-9]+ { return +text(); }

_ "whitespace"
  = " "+
  
eol
  = "\n"