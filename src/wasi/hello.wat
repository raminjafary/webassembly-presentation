(module
  (import "wasi_unstable" "fd_write" 
    (func $fd_write (param i32 i32 i32 i32) 
                    (result i32)))

  (memory 1)
  (export "memory" (memory 0))
  (data (i32.const 8) "hello\n")

  (func $main (export "_start")
  
    ;; io vector within memory
    (i32.store (i32.const 0) (i32.const 8))
    (i32.store (i32.const 4) (i32.const 6))

    (call $fd_write
        (i32.const 1)  ;; file_descriptor
        (i32.const 0)  ;; *iovs
        (i32.const 1)  ;; iovs_len
        (i32.const 16) ;; nwritten
    )
    drop ;; drop the result from the stack
  )
)