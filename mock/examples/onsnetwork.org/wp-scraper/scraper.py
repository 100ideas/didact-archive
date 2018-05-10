###################
# Web Scraper
# v.1.0
# Logan Harber
# https://github.com/chalharb/blog-scraper/
##################

# 2017-09-25 updated @100ideas

import requests
import os
import numpy as np
from bs4 import BeautifulSoup
import html5lib   # required but not imported directly
import urllib.request
from  urllib.parse import urlparse, urljoin
import ssl
import dateutil.parser as dateutil

# Returns generated URL with page number
def generate_url(url, page_number):
    return url + str(page_number)


# Return response text of URL
def get_data(url):
    session = requests.Session()
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'}
    # response = requests.get(url)
    print("requesting {}".format(url))
    response = session.get(url, headers=headers)
    response.raise_for_status()
    return response.text


# Converts title to URL Title
def convert_to_url_title(article):
    return article.text.replace(u'\xa0', u' ').replace(" ", "_").replace("’", "").replace("/", "_")


# Creates a directory to store the output files
def create_directory(output_dir):
    desired_permission = 0o700  # r+w only

    if os.path.isdir(output_dir):
        raise Exception('An error has occurred')
    else:
        print("Attempting to create output directory...")
        try:
            original_umask = os.umask(0)
            os.makedirs(output_dir, desired_permission)
            print("Output directory created successfully!")
        finally:
            os.umask(original_umask)


# Creates files with html content in the output directory
def create_files(article_titles, article_times, article_contents, output_path):
    article_titles = np.array(article_titles).ravel()
    article_times = np.array(article_times).ravel()
    article_contents = np.array(article_contents).ravel()
    datestamped_titles = []

    if len(article_titles) == len(article_times):
        for index, title in enumerate(article_titles):
            datestamped_titles.append(output_path + "/" + article_times[index] + '_' + title)

    if len(datestamped_titles) == len(article_contents):
        # combines 2 arrarys into a dictionary
        combined_articles = dict(zip(datestamped_titles, article_contents))

        print("downloading posts...")
        for [title, content] in combined_articles.items():
            print("\t{}".format(title))

            # os.file + <output>.prettify().encoding() removes linebreaks
            with open(title + '.html', 'w') as file:
                file.write(content.prettify())
    else:
        print('Was unable to scrape the blog correctly. Try again!')


def get_all_images(all_images, output_path):

    session = requests.Session()
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'}

    print("\ndownloading images to {}...".format(output_path))
    for image in all_images:
        print("\t{}".format(image))

        r = session.get(image, headers=headers, stream=True)
        r.raise_for_status()

        filename = os.path.basename(image)
        sep = '?'  # Removes evertying after file extension that wordpress adds
        filename = filename.split(sep, 1)[0]

        output = os.path.join(output_path, filename)
        with open(output, 'wb') as fd:
            for chunk in r.iter_content(chunk_size=128):
                fd.write(chunk)
            fd.close()

# main function
def main():
    # url = "https://medicalcitychildrenshospitalurgentcareblog.wordpress.com/page/"
    url = "http://onsnetwork.org/sjwfriedmanlab/page/"
    page_start = 1
    page_stop = 0
    output_dir = "files"
    images_dir = "images"
    images_fullpath = os.path.join(output_dir,images_dir)
    image_extension = ''
    all_articles_titles = []
    all_articles_times = []
    all_articles_content = []
    all_images = []
    # check if directory exists if not creates it
    try:
        create_directory(output_dir)
    except Exception as e:
        print("CONSOLE: File Directory Already Exists!")

    try:
        create_directory(os.path.join(output_dir,images_dir))
    except Exception as e:
        print("CONSOLE: Images Directory Already Exists!")

    # Crawls pages and stores data
    while True:
        print("\nscraped {} posts so far...".format(len(all_articles_titles)))

        try:
            page_url = generate_url(url, page_start)
            data = get_data(page_url)
            soup = BeautifulSoup(data, 'html5lib')

            # Stores all Titles
            for title in soup.select('.entry-title'):
                all_articles_titles.append(convert_to_url_title(title))

            for time in soup.select('.entry-meta time'):
                # timestring = '{:%Y-%m-%d_%H%M}'.format(dateutil.parse(time['datetime']))
                timestring = '{:%Y%m%d_%H%M}'.format(dateutil.parse(time['datetime']))
                all_articles_times.append(timestring)

            # Stores all images
            for image in soup.select('.entry-content img'):
                all_images.append(image['src'])

            # modify soup - switch img src to relative before storing content html
            # thanks, https://github.com/jabbalaci/jabbapylib/blob/master/jabbapylib/web/scraper/bs.py#L60-L61
            for tag in soup.findAll('img', src=True):
                relsrc = urlparse(tag['src']).path
                relsrc = os.path.basename(relsrc)
                relsrc = os.path.join(images_dir, relsrc)
                tag['src'] = relsrc

            # Stores all Content
            for content in soup.select('.entry-content'):
            # for content in soup.select('.entry-content'):
                all_articles_content.append(content)

        except Exception as e:
            print("\nNo more pages found...")
            break

        page_start += 1
        if page_stop > 0 and page_start > page_stop:
            print("\n'page_stop' set to {}, stopping...".format(page_stop))
            break

    create_files(all_articles_titles, all_articles_times, all_articles_content, output_dir)
    get_all_images(all_images, images_fullpath)

    print("\nTotal Articles Scraped: {}".format(len(all_articles_titles)))


if __name__ == '__main__': main()
