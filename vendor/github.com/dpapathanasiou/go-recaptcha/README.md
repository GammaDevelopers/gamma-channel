go-recaptcha
============

About
-----

This package handles [reCaptcha](https://www.google.com/recaptcha) ([API version 2.0](https://developers.google.com/recaptcha/intro)) form submissions in [Go](http://golang.org/).

Usage
-----

Install the package in your environment:

```
go get github.com/dpapathanasiou/go-recaptcha
```

To use it within your own code, import <tt>github.com/dpapathanasiou/go-recaptcha</tt> and call:

```
recaptcha.Init (recaptchaPrivateKey)
```

once, to set the reCaptcha private key for your domain, then:

```
recaptcha.Confirm (clientIpAddress, recaptchaResponse)
```

for each reCaptcha form input you need to check, using the values obtained by reading the form's POST parameters (the <tt>recaptchaResponse</tt> in the above corresponds to the value of <tt>g-recaptcha-response</tt> sent by the reCaptcha server.)

The recaptcha.Confirm() function returns either true (i.e., the captcha was completed correctly) or false, along with any errors (from the HTTP io read or the attempt to unmarshal the JSON reply).

Usage Example
-------------

Included with this repo is [example.go](example/example.go), a simple HTTP server which creates the reCaptcha form and tests the input.

See the [instructions](example/README.md) for running the example for more details.

## Donate

If you find this work useful, please consider making a donation:

<a href="bitcoin:14TM4ADKJbaGEi8Qr8dh4KfPBQmjTshkZ2">Bitcoin Donate</a> `14TM4ADKJbaGEi8Qr8dh4KfPBQmjTshkZ2`

![QR code](https://bitref.com/qr.php?data=14TM4ADKJbaGEi8Qr8dh4KfPBQmjTshkZ2)
