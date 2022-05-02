(module 
  (memory $memory 1)
  (data (i32.const 0) "\01\00\00\00\02\00\00\00\03\00\00\00")
  (data (i32.const 12) "ABCD")
  (data (i32.const 16) "\07\00\00\00\09\00\00\00")
  (export "memory" (memory $memory))
)