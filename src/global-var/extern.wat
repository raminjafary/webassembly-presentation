(module
  (func $print (import "env" "print") (param i32))
  (func $add (import "env" "add") (param i32) (param i32) (result i32))

  (func (export "log") (param i32)
    local.get 0
    call $print
  )

  (func (export "add") (param i32) (param i32) (result i32)
    local.get 0
    local.get 1
    call $add
  )
  
)