from pyzotero import zotero
import json
from pprint import pprint

with open('../static/data/credentials.json') as credentials:
	data = json.load(credentials)
	zot_id = data["zot_id"]
	zot_coll_xbr = data["zot_coll_xbr"]

pprint(data)
pprint(zot_id)
pprint(zot_coll_xbr)
#
zot = zotero.Zotero(zot_id, 'user', zot_coll_xbr)
items = zot.items()
with open('../static/data/xbr_biblio.json', 'w') as bibliofile:
	json.dump(items, bibliofile)

