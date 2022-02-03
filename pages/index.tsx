import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import Button from '../components/Button'
import styles from '../styles/Home.module.css'

type ShareLink = {
  className: string
  color: string
  value: string
}

function copyToClipboard(textToCopy: string): Promise<void> {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
}

const Home: NextPage = () => {

  const [links, setLinks] = useState<Array<ShareLink>>([])
  const [url, setUrl] = useState<string>('')

  const handleChangeUrl = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value)
  }

  const generateLink = () => {
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    const twitterLink = `https://twitter.com/share?url=${url}`;
    const linkedinLink = `https://www.linkedin.com/shareArticle?url=${url}`;
    const pinterestLink = `https://pinterest.com/pin/create/button/?url=${url}`;
    const emailLink = `mailto:info@example.com?&subject=&body=${url}`;

    setLinks([{ className: 'fab fa-facebook-f', value: facebookLink, color: 'blue' },
    { className: 'fab fa-twitter', value: twitterLink, color: 'aqua' },
    { className: 'fab fa-linkedin', value: linkedinLink, color: 'darkblue' },
    { className: 'fab fa-pinterest', value: pinterestLink, color: 'red' },
    { className: 'fas fa-envelope', value: emailLink, color: 'gray' }
    ])
  }

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Share Link Generator</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
        />
      </Head>
      <div id={styles.wrapper}>
        <h1>Get Your Shareable Links</h1>
        <div>
          <div className={styles['form-group']}>
            <input
              type="url"
              placeholder="Paste here the URL you want to share"
              name="url"
              className={styles['form-control']}
              value={url}
              onChange={handleChangeUrl}
            />
          </div>
          <div className={styles['form-group']}>
            <Button type="submit" className={`${styles.btn} ${styles['btn-primary']}`} onClick={generateLink}>Create Links!</Button>
          </div>
        </div>
        {links.length > 0 && <div>
          <h2 className={styles['text-center']}>Get your links</h2>
          {links.map((link, index) => (<div className={styles['input-group']} key={index}>
            <div
              className={styles['input-group-prepend']}
              style={{ backgroundColor: link.color }}
            >
              <span className={styles['input-group-text']}>
                <i
                  className={link.className}
                ></i
                ></span>
            </div>
            <input
              type="text"
              readOnly
              value={link.value}
              className={styles['form-control']}
            />
            <div className={styles['input-group-append']}>
              <Button title='Test Link' href={link.value}>
                <i className="fas fa-arrow-right"></i>
              </Button>
              <Button title='Copy Link' tooltip='Copied' onClick={() => copyToClipboard(link.value)}>
                <i className="fas fa-clone"></i>
              </Button>
              <Button title='Copy HTML' className={`${styles.btn} ${styles['btn-primary']}`}
                onClick={() => copyToClipboard(`<a href=&quot;${link.value}&quot;>Share this!</a>`)}
              >
                <i className="fas fa-code"></i>
              </Button>
            </div>
          </div>))}
        </div>}
      </div>
    </div>
  )
}

export default Home;
