# ffmpeg

触ることに合ったので雑にメモ。

## Install

[FFmpeg](http://www.ffmpeg.org/) から。

## Command

### codec

使えるコーデックを表示。

```cmd
ffmpeg --codecs
```

### VOB -> mp4 Encoding

```cmd
ffmpeg -i <input video file> -c:v <codec> -vprofile high -vlevel 3.1 -crf <0-51> -c:a <audio codec> <output file name>.mp4
```

- ctf : 品質 (default 22, 0-51 まで)

### concat

input に指定する際、複数のファイルを concat を使って結合できる。

```cmd
ffmpeg -i "concat:VTS_01_1.VOB|VTS_01_2.VOB|VTS_02_1.VOB|VTS_02_2.VOB|VTS_02_3.VOB" -c:v h264_nvenc -vprofile high -vlevel 3.1 -crf 51 -c:a aac OUTPUT.mp4
```

## ffprobe

動画の情報を取得できる。

```cmd
ffprove <video file path>
```

## Copyright の表示を消す

```cmd
ffmpeg -hide_banner <command>
ffprove -hide_banner <video file path>
```

## Ref

- [[ffmpeg] DVDのVOBデータをMP4ファイルに変換するには – 端くれプログラマの備忘録](https://www.84kure.com/blog/2014/10/20/ffmpeg-dvd%E3%81%AEvob%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92mp4%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF/)
