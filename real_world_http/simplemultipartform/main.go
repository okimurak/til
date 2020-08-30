package main

import (
	"bytes"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"net/textproto"
	"os"
)

func main() {
	var buffer bytes.Buffer
	writter := multipart.NewWriter(&buffer)
	writter.WriteField("name", "MiChel Jacson")
	part := make(textproto.MIMEHeader)
	part.Set("Content-Type", "image/jpeg")
	part.Set("Content-Disposition", `form-data; name="thumnail"; filename="photo.jpg"`)
	fileWriter, err := writter.CreatePart(part)
	if err != nil {
		panic(err)
	}
	readFile, err := os.Open("photo.jpg")
	if err != nil {
		panic(err)
	}
	defer readFile.Close()
	io.Copy(fileWriter, readFile)
	writter.Close()

	resp, err := http.Post("http://localhost:18888", writter.FormDataContentType(), &buffer)
	if err != nil {
		panic(err)
	}
	log.Println("Status:", resp.Status)
}
