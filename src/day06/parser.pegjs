start
  = a:numbers eol b:numbers eol c:numbers eol d:numbers eol o:operators { return { numbers: [a,b,c,d], operators: o  }}

numbers
  = _? h:int t:(_ int)* _? { return [h, ...t.map(item => item[1])] }

operators
  = _? h:operator t:(_ operator)* _? { return [h, ...t.map(item => item[1])] }

operator
  = "+" / "*"
  
int "integer"
  = [0-9]+ { return +text(); }

_ "whitespace"
  = " "+
  
eol
  = "\n"