import Libhoney from "libhoney";

let hny = new Libhoney({
  writeKey: process.env.HONEYCOMB_API_KEY,
  dataset: process.env.DATASET,
});

export default function handler(req, res) {
  if (req.method == "POST") {
    hny.sendNow(JSON.parse(req.body));
    res.status(204).send();
  }
}
