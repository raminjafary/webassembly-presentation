(module
  (import "env" "mem" (memory 1))

  (func (export "sum") (param $len i32) (result i32)
    (local $offset i32)
    (local $sum i32)
    (local $end i32)

    (local.set $offset (i32.const 0))
    (local.set $end (i32.mul (local.get $len) (i32.const 4)))

    (block $block (loop $top
        (br_if $block (i32.eq (local.get $offset) (local.get $end)))
        (local.set $sum (i32.add (local.get $sum) (i32.load (local.get $offset))))
        (local.set $offset (i32.add (local.get $offset) (i32.const 4)))

        (br $top)
    ))
    (local.get $sum)
  )
)