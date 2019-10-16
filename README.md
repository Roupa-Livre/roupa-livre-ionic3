# App Roupa Livre IONIC #

## Como Rodar com Docker ##

Base: https://gist.github.com/piccaso/a6bd436dff7279d57e54c69d3b012431

Na raiz do Projeto:
```
docker-composer build
docker-composer up
```

## Como Rodar ##

Setting up the Environment

```bash
npm install -g cordova
npm install -g ionic
```

After cloning the project, to setup project

```bash
git clone https://github.com/roupa-livre/roupa-livre-ionic3
cd roupa-livre-ionic3
npm install
```

Then run
```bash
ionic serve
```


## Deploy ##

### Como efetuar o deploy ###

* Google Play Store
* Apple App Store

Procedimentos a partir de um UNIX/MAC

### Google Play Store ###

1 - Compile para Release
```
ionic cordova build --release android
```

2 - Assine o apk
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../keys/play-store-nucleo.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk nucleo --storepass:env NUCLEO_ROUPA_ANDROID_KEY
rm -rf ./RELEASE
mkdir -p RELEASE
mv -f platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./RELEASE/android-release-unsigned.apk

rm -rf ./UPLOAD
mkdir -p UPLOAD
APP_VERSION=$(xmllint -xpath 'string(//*[local-name()="widget"]/@version)' config.xml \
| cut -f1-3 -d.)
APP_VERSIONCODE=$(xmllint -xpath 'string(//*[local-name()="widget"]/@android-versionCode)' config.xml \
| cut -f1-3 -d.)
zipalign -v 4 ./RELEASE/android-release-unsigned.apk ./UPLOAD/roupalivre-$APP_VERSION-$APP_VERSIONCODE.apk
open ./UPLOAD
```

### iOS ###

1 - Compile para Release
```
ionic cordova build ios --release
```

2 - Abra o projeto pelo XCode, e faça o Archive e Publish
```
open platforms/ios/RoupaLivre.xcworkspace
```
