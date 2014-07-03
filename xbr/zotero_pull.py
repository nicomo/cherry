from pyzotero import zotero
import json

zot = zotero.Zotero('123401','user','jPSjb41TyrIXK18hGkHdBXv5')
items = zot.items()
with open('../static/data/xbr_biblio.json', 'w') as bibliofile:
	json.dump(items, bibliofile)

