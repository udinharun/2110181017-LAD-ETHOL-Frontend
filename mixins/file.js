import FileSaver from 'file-saver'
import JsZip from 'jszip'
import JsZipUtils from 'jszip-utils'
export default {
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    downloadFileEthol(url) {
      const array = url.split('/')
      const fileName = array[array.length - 1]
      this.$axios({
        url,
        method: 'GET',
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    thumbFile(urlFile) {
      const extensiFile = urlFile.substr(urlFile.lastIndexOf('.') + 1)
      if (extensiFile == 'docx' || extensiFile == 'doc') {
        return '/icon-file/word.png'
      } else if (
        extensiFile == 'xls' ||
        extensiFile == 'xlsx' ||
        extensiFile == 'csv'
      ) {
        return '/icon-file/excel.png'
      } else if (extensiFile == 'zip' || extensiFile == 'rar') {
        return '/icon-file/zip.png'
      } else if (extensiFile == 'ppt' || extensiFile == 'pptx') {
        return '/icon-file/powerpoint.png'
      } else if (extensiFile == 'pdf') {
        return '/icon-file/pdf.png'
      } else if (
        extensiFile == 'jpg' ||
        extensiFile == 'jpeg' ||
        extensiFile == 'png' ||
        extensiFile == 'gif' ||
        extensiFile == 'webp'
      ) {
        return '/icon-file/image.png'
      } else {
        return '/icon-file/file.png'
      }
    },
    downloadZip(urls, name) {
      return new Promise((resolve, reject) => {
        const zip = new JsZip()
        let count = 0
        urls.forEach(function (url) {
          const array = url.split('/')
          const filename = array[array.length - 1]

          console.log('filename', filename)
          // loading a file and add it in a zip file
          JsZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
              reject(err)
            }
            zip.file(filename, data, { binary: true })
            count++
            if (count == urls.length) {
              zip.generateAsync({ type: 'blob' }).then(function (content) {
                FileSaver.saveAs(content, name + '.zip')
                resolve(true)
              })
            }
          })
        })
      })
    },
  },
}
