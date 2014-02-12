# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Auth::Application.config.secret_key_base = '33043f8e52901d1932c7f67f6b1ee763b20ee40ddfa464cd6bc8aff1fe8669190e4c3883ddd5a56853a277af92af040d620ebf9746c9873619cc594fd463eb06'
