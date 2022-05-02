(module
(memory (import "env" "mem") 1)

(import "env" "logString" (func $log (param i32 i32)))

(data (i32.const 0) "hi")

  (func (export "logString")  
    i32.const 0
    i32.const 2
    call $log
  )
)
