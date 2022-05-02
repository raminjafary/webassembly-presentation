(module
  (import "env" "mem" (memory 1))

  (func (export "add") (param i32 i32) (result i32) 
  (local $sum i32)

  (local.set $sum (i32.add (local.get 1) (i32.load8_u (local.get 0))))

  (i32.store8 (local.get 0) (local.get $sum))

  (i32.store8 (i32.add (i32.load8_u (local.get 0)) (i32.const 1)) (local.get $sum))
  
  (i32.load8_u (local.get 0))
  )
)
