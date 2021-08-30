using Newtonsoft.Json;

namespace API.Models
{
    public class City
    {
        [JsonProperty(PropertyName = "id")]
        public int ID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "country")]
        public string Country { get; set; }

        [JsonProperty(PropertyName = "subCountry")]
        public string SubCountry { get; set; }

        [JsonProperty(PropertyName = "geoNameID")]
        public int? GeoNameID { get; set; }
    }
}
