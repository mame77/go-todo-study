package main

import (
	"fmt"
	"math"
)

// 様々な図形の面積を計算する例
type Shape interface {
	Area() float64
}

type Circle struct{ radius float64 }
type Rectangle struct{ width, height float64 }

func (c Circle) Area() float64    { return math.Pi * c.radius * c.radius }
func (r Rectangle) Area() float64 { return r.width * r.height }

// インターフェースを使った汎用関数
func printArea(s Shape) {
	fmt.Printf("面積: %.2f\n", s.Area())
}

func main() {
	shapes := []Shape{
		Circle{radius: 5},
		Rectangle{width: 4, height: 6},
	}

	// 型に関係なく同じ方法で処理
	for _, shape := range shapes {
		printArea(shape) // Circleでもrectangleでも同じ呼び方
	}
}
