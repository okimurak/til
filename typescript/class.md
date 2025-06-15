# クラス

昔の JavaScript よりは書きやすくなった。

`public` はなくて良い（変わらない）。`protected` も使えるが、TypeScript で改装が深くなる継承をすることは少ないので、使うことはほぼなし。

```typescript
class SmallAnimal {
  // プロパティは名前: 型
  animalType: string;

  // private 宣言
  private place: string;

  // static 宣言
  static staticVariable = "こんにちは"

  // readonly : ただし再帰的に定義できない。
  readonly size: number;

  // コンストラクタ (省略可能)
  constructor() {
    this.animalType = "アカミミガメ";
    // readonly はコンストラクタのみ書き換え可能
    this.size = 80;
  }

  // メソッド
  walk() {
    console.log(`${this.animalType} は歩くよ`)
  }

  discover(place: string) {
    // private プロパティにセット
    this.place = place;
  }

  static hello () {
    console.log("Hello World!");
    // static 宣言したプロパティは this でもOK
    console.log(`${this.staticVariable}`);
    // これは TS 2339 エラー
    // console.log(this.place);
  }

  hi () {
    // これは OK
    console.log(SmallAnimal.staticVariable);
    // これは参照不可
    // console.log(this.staticVariable);
  }

  readonly hogehoge: {
    fugafuga : number;         // SmallAnimal.hogehoge.fugafuga = 1; これは上書きできる。
    readonly tokotoko: number; // SmallAnimal.hogehoge.tokotoko = 1; これは上書きできない。つまり子にもつける必要がある。(ReadOnly<T> を使うことも検討しよう) 
  }
}
```

## コンストラクタの引数でプロパティ宣言

TypeScript 固有の仕様。

```typescript
class SmallAnimal {
  constructor(private place: string) {}

  discover(place: string) {
    // コンストラクタの引数にそのままアクセスできる。
    this.place = place
  }
}
```

## インスタンスクラスフィールド

イベントハンドラにメソッドを渡す際、メソッド単体を渡すとオブジェクトが引き剥がされてしまい、 `this` が行方不明になってしまってため、 `bynd()` を使って回避していた。

これを使うと、クラス宣言中のプロパティ宣言として書く事ができるため、イベントハンドラにメソッドをそのまま渡しても、オブジェクトからメソッドが引き剥がされない。

```typescript
// 旧: bind での実装
class SmallAnimal {
  constructor() {
    this._fav = "骨"
    this.say = this.say.bind(this)
  }

  say() {
    console.log(`私は${this._fav}が好きです。`)
  }
}

// 新: インスタンスクラスフィールドでの実装
class SmallAnimal {
  fav = "骨"
  say = () => {
    console.log(`私は${this.fav}が好きです。`)
  }
}
```

## 継承

`extend` を使う。

```typescript
class Monster {
  skill() {
    console.log("はたく を くりだした！")
  }
}

class Pikachu extends Monster {
  skill() {
    console.log("でんきショック を くりだした！")
  }
}
```

## インタフェース

`interface` で定義をし、クラス側では `implementes` を使う。

```typescript
interface Monster {
  skill()
}

class Pikachu implements Monster {
  skill() {
    console.log("でんきショック を くりだした！")
  }
}
```

## デコレータ

Stage 2 機能。Python 2.5 で導入されたデコテータや、Java の Lombok に似ている。

`compilerOptions.experimentalDecorators` を `true` にすると、動作する。

```typescript
function LightningShock(target) {
  target.prototype.skill => {
    console.log("でんきショック を くりだした！");
  };
  return target;
}

@LightningShock
class Pikachu {
}

const pika = new Pikachu();
pika.skill();
```

## 参考

- [クラス — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/class.html)
