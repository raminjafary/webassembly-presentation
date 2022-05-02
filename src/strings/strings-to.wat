(module
  (memory (import "env" "mem") 1)

  (func (export "reverse") (param $len i32)
  (local $end i32)
  (local $start i32)
  (local $temp i32)

  (local.set $start (i32.const 0))
  (local.set $end (i32.sub (local.get $len) (i32.const 1)))

  (block $block (loop $top
    (br_if $block (i32.ge_u (local.get $start) (local.get $end)))

    (local.set $temp (i32.load8_u (local.get $start)))

    (i32.store8 (local.get $start) (i32.load8_u (local.get $end)))
    (i32.store8 (local.get $end) (local.get $temp))

    (local.set $start (i32.add (local.get $start) (i32.const 1)))
    (local.set $end (i32.sub (local.get $end) (i32.const 1)))
    
    (br $top)
  ))
  )
)