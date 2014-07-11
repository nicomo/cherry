#
# using the zotero API to retrieve items
# WORK IN PROGRESS - NOT FUNCTIONAL
#




from pyzotero import zotero
import json

# we get the credentials to access the zotero API
with open('../static/data/credentials.json') as credentials:
	data = json.load(credentials)
	zot_id = data["zot_id"]
	zot_coll_xbr = data["zot_coll_xbr"]

# connect
zot = zotero.Zotero(zot_id, 'user', zot_coll_xbr)

# add parameters
zot.add_parameters(order='creator')

# get all references in library
zot.num_items()
items0 = zot.items() # 1st batch, default limit is 50
lazy = zot.iterfollow()
items1 = lazy.next() #2d batch


# write to json file
with open('../static/data/xbr_biblio0.json', 'w') as bibliofile:
	json.dump(items0, bibliofile)

# write to json file
with open('../static/data/xbr_biblio1.json', 'w') as bibliofile:
	json.dump(items1, bibliofile)
