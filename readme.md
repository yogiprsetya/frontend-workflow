# Modern Frontend Engineer Workflow
Otomasi pengembangan *Frontend* dengan SASS dan Gulp menggunakan NodeJS (Bahasa Indonesia).

*Disclaimer: alur kerja ini cocok untuk project menengah hingga besar. Untuk pembuatan 1-3 halaman website static yang tidak akan banyak dimaintenance cukup menggunakan cara tradisional saja.*

### Peruntukan
Selain disclaimer diatas, berikut adalah peruntukan dari dibuatnya readme ini:
1. Untuk profesional: sebagai pengingat saat akan memulai project. Karena pasti step2 ini hanya dilakukan diawal project saja, bisa aja lupa.
2. Untuk pemula: sebagai media pembelajaran untuk meningkatkan kemampuan dibidang frontend developer, karena pengetahuan ini akan menjadi nilai+ di industri nanti.
3. Untuk saya: kembali ke poin satu.

Karena (menurut saya) ini penting untuk semua tingkatan, jadi silahkan di watching saja.

NB: workflow ini dibuat untuk developer yang sudah cukup sering mengerjakan project. 5x project kecil atau 3x project menegah. Untuk yang baru banget mulai belajar web development boleh diskip dulu.

## Persenjataan
Secara garis besar, peralatan perang yang digunakan terdiri dari 3 tools sakti yaitu SASS, Gulp dan tentu NodeJS.

### 1. SASS
SASS atau Syntactically Awesome StyleSheets adalah sebuah bahasa yang diadopsi dari CSS, namun dengan fitur yang lebih baik yang dapat memudahkan developer dalam hal menulis kode CSS.

SASS **bukan** pengganti CSS, SASS adalah tools yang membuat CSS menjadi lebih mudah.

SASS memiliki fitur2 bahasa pemgrograman seperti variable, nesting dll. [Lengkapnya disini](https://sass-lang.com "Lengkapnya disini").

### Gulp
Gulp adalah tool untuk membantu proses web development. Seperti asisten virtual, Gulp dapat membantu mengerjakan tugas yang repetitif dan membosankan.

Seperti merefresh browser untuk melihat perubahan, seru kan? Lebih lengkap mengenal Gulp bisa [klik disini](http://gulpjs.com/ "klik disini").

### NodeJS
Menurut Wikipedia, Node.js adalah platform perangkat lunak pada sisi-server dan aplikasi jaringan.

Ditulis dengan bahasa JavaScript. Node.js memiliki library server HTTP sendiri sehingga memungkinkan untuk menjalankan server web tanpa menggunakan program server web seperti Apache atau Lighttpd.

## Step by Step
Go ahead. Oiya, semua step ini dijalankan melalui terminal atau CMD.

#### Instalasi Node.js
Unduh installer Node.js di https://nodejs.org dengan memilih sistem operasi dan arsitektur yang digunakan. Jalankan installer, lalu ikuti instruksi instalasi.

#### Instalasi NPM
NPM (Node Package Manager) sudah ada dalam paket instalasi node, https://www.npmjs.com

#### Instalasi Gulp
Buka CMD, lalu instal Gulp secara global.
```
npm install gulp --global
```
#### Cek NPM, NodeJS, Gulp, SASS
```
node -v && npm -v && gulp -v && sass --version
```
Jika muncul versi dari tools diatas berarti semua sudah siap.

### Membuat folder dan file package.json
```
mkdir mywork && cd mywork
npm init
```

Package.json berisi informasi metadata tentang project seperti deskripsi, versi, dan module yang akan digunakan dalam project, dsb. Isinya kira-kira seperti berikut :
```
{
  "name": "mywork",
  "version": "1.0.0",
  "description": "belajar SASS dan Gulp dengan NodeJS",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Sastra Nababan",
  "license": "ISC"
}
```
#### Membuat struktur folder
>mkdir app dist && cd app && mkdir css img js scss && type NUL > scss/style.scss && type NUL > css/style.css && type NUL > index.html && cd..

Maka akan membuat struktur folder sepeti ini:
```
- app
-- css
--- style.css
-- img
-- js
-- scss
--- style.scss
-- index.html
- dist
```
Ada 2 folder. Folder app digunakan pada saat proses development. Terdapat file html, css, gambar javascript dan library lain yang digunakan dalam project. Sedangkan dist adalah optimasi dari folder app yang siap untuk di publish.

#### Install package GULP sebagai devDependeny (Lokal)
```
npm install --save-dev gulp
```
Proses ini akan menghasilkan folder node_modules didalam folder project (mywork).
### Install package yang akan digunakan
1. gulp-sass
2. gulp-sass
3. browser-sync
4. gulp-sourcemaps
5. gulp-autoprefixer
6. gulp-clean
7. gulp-minify-html
8. gulp-uglify
9. gulp-imagemin
10. gulp-concat
11. gulp-cssnano
12. gulp-plumber
13. gulp-notify
14. gulp-zip
15. merge-stream
16. gulp-htmlmin

```
npm install --save-dev gulp-sass browser-sync gulp-sourcemaps gulp-autoprefixer gulp-clean gulp-minify-html gulp-uglify gulp-imagemin gulp-concat gulp-cssnano gulp-plumber gulp-notify gulp-zip merge-stream gulp-htmlmin
```
*Untuk fungsi2 package diatas bisa digoogling*

#### Create a new file gulpfile.js
Buat file baru dengan nama gulpfile.js di dalam folder mywork. File ini menyimpan tugas2 yang akan dilakukan oleh Gulp.

Contoh tugas untuk compile file *.scss dari folder scss menjadi file *.css ke folder css
```javascript
// Konfigurasi
var gulp  = require('gulp');

// Compile SCSS
gulp.task('sass', function () {
	 return gulp.src('./app/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./app/css'))
});
```
#### Mengisi gulpfile.js dengan tugas2 yang diperlukan
```javascript
// Konfigurasi
var gulp  = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var merge = require('merge-stream');
var clean = require('gulp-clean');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var zip = require('gulp-zip');
var gutil = require('gulp-util');
var clean = require('gulp-clean');

// Compile SCSS
gulp.task('sass', function (){
  return gulp.src('./app/scss/*.scss')
    .pipe(plumber({
    	errorHandler:function(err){
    		 notify.onError({
    		 	title : "Gulp error in " + err.plugin,
    		 	message : err.toString()
    		 	})(err)
    	}
    	}))
    .pipe(sass())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./app/css'))
    .pipe(reload({stream: true}));
});

// Clean Build Directory
gulp.task('cleanBuild',function(){
     return gulp.src('dist/**/*', {read: false})
     .pipe(clean());
});

// Deploy to Build Directory
gulp.task('deploy', gulp.series(['cleanBuild']), function(){
 
// optimasi css
 var cssOptimize = gulp.src('app/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css/'));

// menggabung semua file js dan optimasi
var jsOptimize = gulp.src('app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

// optimasi image
var imgOptimize = gulp.src('app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))

// optimasi html
var htmlOptimize = gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));

// fonts folder
var fonts= gulp.src('app/fonts/**')
    .pipe(gulp.dest('dist/fonts'));

return merge(cssOptimize,jsOptimize,imgOptimize,htmlOptimize,fonts); 

});

// Deploy to Zip file
gulp.task('deployZip', gulp.series(['deploy']),function(){
    var zipNow = gulp.src('dist/**')
    .pipe(zip('deploy.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('cfonts',function(){
    gulp.src('app/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

// Default Task. Local webserver dan sinkronisasi dengan browser. 
gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch('./app/**/*').on('change', reload);
    gulp.watch('./app/scss/*.scss', gulp.series(['sass']));
});
```
*Untuk fungsi2nya silahkan dipelajari [disini](https://gulpjs.com/docs/en/getting-started/creating-tasks "disini") sudah sangat lengkap.*

## Lets Code
Jalankan dengan perintah
> gulp

Browser akan mebuka lokal server, koding seperti biasa, setiap save file browser akan merefresh otomatis.

Kode error? akan ada notifikasi di pojok kanan atas browser, error log akan ditampilkan pada jendela CMD.

## Time to Deploy
Untuk membuat file yang sudah di optimasi, mengunakan perintah
>gulp deployZip

File2 pada folder app akan dikirim ke folder dist dalam bentuk sudah terpotimasi.

#### What next?
Sampai sini merupakan proses2 pengembangan web dengan pendekatan frontend, masih ada step2 lanjutan seperti koneksi dengan Git, normalsasi struktur folder dan lain

*Inti dari Ilmu pengetahuan adalah explorasi, silahkan explorasi kemampuanmu dan jangan lupa sesuaikan dengan lingkungan kerja.*

## Finally
File readme ini dibuat sebagai catatan pribadi, tools ataupun package yang digunakan bersifat personal. Sesuaikan dengan lingkungan kerja agar semua team (jika ada) merasa nyaman dan terbantu.

Sebagai sumber inspirasi penulisan adalah [Sastra Panca Nababan](https://web.facebook.com/sastranababan "Sastra Panca Nababan") pada kegiatan MedanJs Meetup2 (December 2016).


------------
Contact Me: yogiprsetya@gmail.com
