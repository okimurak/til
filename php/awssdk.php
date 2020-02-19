<?php
  // AWS SDK
  // [AWS SDK for PHP 3.x](https://docs.aws.amazon.com/ja_jp/aws-sdk-php/v3/api/index.html)
  // [認証情報プロバイダの使用 - AWS SDK for PHP](https://docs.aws.amazon.com/ja_jp/sdk-for-php/v3/developer-guide/guide_credentials_provider.html)

  /**
   * Get Credential from Instanse Profile on EC2
   * 
   * @return array credentials
   */
  function getCredential1()
  {
      $profile = \Aws\Credentials\CredentialProvider::instanceProfile();
      $promise = $profile();
      $credential = $promise->wait();
      return $credential;
  }

  /**
   * Get Credential from Instanse Profile on EC2
   * 
   * @return array credentials
   */
  function getCredential2()
  {
      $profile = \Aws\Credentials\CredentialProvider::instanceProfile();
      $credential = CredentialProvider::memoize($profile);
      return $credential;
  }