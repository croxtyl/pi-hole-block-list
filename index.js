const fs = require('fs');
const path = require('path');
const axios = require('axios');

const sourceFiles = [
  {
    urls: [
        { url: 'https://adaway.org/hosts.txt', backup: 'hosts-backup/ads/1.txt' },
        { url: 'https://raw.githubusercontent.com/0Zinc/easylists-for-pihole/master/easylist.txt', backup: 'hosts-backup/ads/2.txt' },
        { url: 'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt', backup: 'hosts-backup/ads/3.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/SmartTV_ads.txt', backup: 'hosts-backup/ads/4.txt' },
        { url: 'https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt', backup: 'hosts-backup/ads/5.txt' },
        { url: 'https://v.firebog.net/hosts/Easylist.txt', backup: 'hosts-backup/ads/6.txt' },
        { url: 'https://www.github.developerdan.com/hosts/lists/amp-hosts-extended.txt', backup: 'hosts-backup/ads/7.txt' },
        { url: 'https://raw.githubusercontent.com/0Zinc/easylists-for-pihole/master/easyprivacy.txt', backup: 'hosts-backup/ads/8.txt' },
        { url: 'https://raw.githubusercontent.com/neodevpro/neodevhost/master/host', backup: 'hosts-backup/ads/9.txt' },
        { url: 'https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts', backup: 'hosts-backup/ads/10.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/hostfile.txt', backup: 'hosts-backup/ads/11.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/Ad_filter_list_by_Disconnect.txt', backup: 'hosts-backup/ads/12.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/easylist_host.txt', backup: 'hosts-backup/ads/13.txt' },
        { url: 'https://www.github.developerdan.com/hosts/lists/ads-and-tracking-extended.txt', backup: 'hosts-backup/ads/14.txt' },
        { url: 'https://raw.githubusercontent.com/d3ward/toolz/master/src/d3host.txt', backup: 'hosts-backup/ads/15.txt' },
        { url: 'https://o0.pages.dev/Lite/domains.txt', backup: 'hosts-backup/ads/16.txt' },
        { url: 'https://raw.githubusercontent.com/bongochong/CombinedPrivacyBlockLists/master/newhosts-final.hosts', backup: 'hosts-backup/ads/17.txt' },
        { url: 'https://secure.fanboy.co.nz/fanboy-mobile-notifications.txt', backup: 'hosts-backup/ads/18.txt' }
    ],
    target: path.join('hosts', 'ads.txt')
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/ads.txt', backup: 'hosts-backup/ads2/1.txt' },
        { url: 'https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt', backup: 'hosts-backup/ads2/2.txt' },
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Ads', backup: 'hosts-backup/ads2/3.txt' },
        { url: 'https://v.firebog.net/hosts/AdguardDNS.txt', backup: 'hosts-backup/ads2/4.txt' },
        { url: 'https://v.firebog.net/hosts/Prigent-Ads.txt', backup: 'hosts-backup/ads2/5.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adguard_mobile_host.txt', backup: 'hosts-backup/ads2/6.txt' },
        { url: 'https://gitlab.com/quidsup/notrack-blocklists/-/raw/master/trackers.hosts', backup: 'hosts-backup/ads2/7.txt' },
        { url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts', backup: 'hosts-backup/ads2/8.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/kad_host.txt', backup: 'hosts-backup/ads2/9.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/easy_privacy_host.txt', backup: 'hosts-backup/ads2/10.txt' },
        { url: 'https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileSpyware.txt', backup: 'hosts-backup/ads2/11.txt' },
        { url: 'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Extension/GoodbyeAds-Samsung-AdBlock.txt', backup: 'hosts-backup/ads2/12.txt' }
    ],
    target: path.join('hosts', 'ads-2.txt')
  },
  {
    urls: [
        { url: 'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext', backup: 'hosts-backup/ads3/1.txt' },
        { url: 'https://raw.githubusercontent.com/craiu/mobiletrackers/master/list.txt', backup: 'hosts-backup/ads3/2.txt' },
        { url: 'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Hosts/GoodbyeAds.txt', backup: 'hosts-backup/ads3/3.txt' },
        { url: 'https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileAds.txt', backup: 'hosts-backup/ads3/4.txt' },
        { url: 'https://v.firebog.net/hosts/Admiral.txt', backup: 'hosts-backup/ads3/5.txt' },
        { url: 'https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt', backup: 'hosts-backup/ads3/6.txt' },
        { url: 'https://blocklistproject.github.io/Lists/tracking.txt', backup: 'hosts-backup/ads3/7.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/NoTrack_Tracker_Blocklist.txt', backup: 'hosts-backup/ads3/8.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adservers.txt', backup: 'hosts-backup/ads3/9.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/adguard_host.txt', backup: 'hosts-backup/ads3/10.txt' },
        { url: 'https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardApps.txt', backup: 'hosts-backup/ads3/11.txt' },
        { url: 'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Extension/GoodbyeAds-Xiaomi-Extension.txt', backup: 'hosts-backup/ads3/12.txt' },
        //{ url: 'https://raw.githubusercontent.com/cbuijs/ut1/master/ads/domains.original', backup: 'hosts-backup/ads/1.txt' }
    ],
    target: path.join('hosts', 'ads-3.txt')
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/malware.txt', backup: 'hosts-backup/gen/1.txt' },
        { url: 'https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts', backup: 'hosts-backup/gen/2.txt' },
        { url: 'https://blocklistproject.github.io/Lists/phishing.txt', backup: 'hosts-backup/gen/3.txt' },
        { url: 'https://blocklistproject.github.io/Lists/scam.txt', backup: 'hosts-backup/gen/4.txt' },
        { url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts', backup: 'hosts-backup/gen/5.txt' },
        { url: 'https://hole.cert.pl/domains/v2/domains_hosts.txt', backup: 'hosts-backup/gen/6.txt' },
        { url: 'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts', backup: 'hosts-backup/gen/7.txt' },
        { url: 'https://winhelp2002.mvps.org/hosts.txt', backup: 'hosts-backup/gen/8.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/KADhosts.txt', backup: 'hosts-backup/gen/9.txt' },
        //{ url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/cookies_filters/adblock_cookies.txt', backup: 'hosts-backup/gen/1.txt' }
    ],
    target: path.join('hosts', 'gen.txt')
  },
  {
    urls: [
        { url: 'https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt', backup: 'hosts-backup/gen2/1.txt' },
        { url: 'https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt', backup: 'hosts-backup/gen2/2.txt' },
        { url: 'https://phishing.army/download/phishing_army_blocklist_extended.txt', backup: 'hosts-backup/gen2/3.txt' },
        { url: 'https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/scam-urls.txt', backup: 'hosts-backup/gen2/4.txt' },
        { url: 'https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/spam.mails', backup: 'hosts-backup/gen2/5.txt' },
        { url: 'https://v.firebog.net/hosts/RPiList-Malware.txt', backup: 'hosts-backup/gen2/6.txt' },
        { url: 'https://urlhaus.abuse.ch/downloads/hostfile', backup: 'hosts-backup/gen2/7.txt' },
        { url: 'https://big.oisd.nl', backup: 'hosts-backup/gen2/8.txt' }
    ],
    target: path.join('hosts', 'gen-2.txt')
  },
  {
    urls: [
        { url: 'https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-hosts-online.txt', backup: 'hosts-backup/gen3/1.txt' },
        { url: 'https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/malware', backup: 'hosts-backup/gen3/2.txt' },
        { url: 'https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/pihole-phishing-adlist.txt', backup: 'hosts-backup/gen3/2.txt' },
        { url: 'https://raw.githubusercontent.com/durablenapkin/scamblocklist/master/hosts.txt', backup: 'hosts-backup/gen3/4.txt' },
        { url: 'https://www.stopforumspam.com/downloads/toxic_domains_whole.txt', backup: 'hosts-backup/gen3/5.txt' },
        { url: 'https://v.firebog.net/hosts/RPiList-Phishing.txt', backup: 'hosts-backup/gen3/6.txt' },
        { url: 'https://justdomains.github.io/blocklists/lists/adguarddns-justdomains.txt', backup: 'hosts-backup/gen3/7.txt' },
        { url: 'https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/ParsedBlacklists/EasyList-Liste-FR.txt', backup: 'hosts-backup/gen3/8.txt' }
    ],
    target: path.join('hosts', 'gen-3.txt')
  },
  {
    urls: [
        { url: 'https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt', backup: 'hosts-backup/gen4/1.txt' },
        { url: 'https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt', backup: 'hosts-backup/gen4/2.txt' },
        { url: 'https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Phishing-Angriffe', backup: 'hosts-backup/gen4/3.txt' },
        { url: 'https://raw.githubusercontent.com/jarelllama/Scam-Blocklist/main/lists/wildcard_domains/scams.txt', backup: 'hosts-backup/gen4/4.txt' },
        { url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts', backup: 'hosts-backup/gen4/5.txt' },
        { url: 'https://bitbucket.org/ethanr/dns-blacklists/raw/8575c9f96e5b4a1308f2f12394abd86d0927a4a0/bad_lists/Mandiant_APT1_Report_Appendix_D.txt', backup: 'hosts-backup/gen4/6.txt' },
        { url: 'https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/ParsedBlacklists/EasyList.txt', backup: 'hosts-backup/gen4/7.txt' },
        { url: 'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/hosts/pro.txt', backup: 'hosts-backup/gen4/8.txt' }
    ],
    target: path.join('hosts', 'gen-4.txt')
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/master/generated/hosts', backup: 'hosts-backup/gen5/1.txt' },
        { url: 'https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt', backup: 'hosts-backup/gen5/2.txt' },
        { url: 'https://blocklistproject.github.io/Lists/ransomware.txt', backup: 'hosts-backup/gen5/3.txt' },
        { url: 'https://blocklistproject.github.io/Lists/fraud.txt', backup: 'hosts-backup/gen5/4.txt' },
        { url: 'https://v.firebog.net/hosts/static/w3kbl.txt', backup: 'hosts-backup/gen5/5.txt' },
        //{ url: 'https://raw.githubusercontent.com/badmojr/1Hosts/master/Xtra/domains.wildcards', backup: 'hosts-backup/ads/1.txt' },
        { url: 'https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt', backup: 'hosts-backup/gen5/6.txt' }
    ],
    target: path.join('hosts', 'gen-5.txt')
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/piracy.txt', backup: 'hosts-backup/illegal/1.txt' },
        { url: 'https://blocklistproject.github.io/Lists/drugs.txt', backup: 'hosts-backup/illegal/2.txt' },
        { url: 'https://www.github.developerdan.com/hosts/lists/hate-and-junk-extended.txt', backup: 'hosts-backup/illegal/3.txt' }
    ],
    target: path.join('hosts', 'illegal.txt')
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/porn.txt', backup: 'hosts-backup/porn/1.txt' },
        { url: 'https://raw.githubusercontent.com/chadmayfield/my-pihole-blocklists/master/lists/pi_blocklist_porn_all.list', backup: 'hosts-backup/porn/2.txt' }
    ],
    target: path.join('hosts', 'porn.txt')
  },
  {
    urls: [
        { url: 'https://nsfw.oisd.nl', backup: 'hosts-backup/porn2/1.txt' },
        { url: 'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/pornography-hosts', backup: 'hosts-backup/porn2/2.txt' },
        { url: 'https://raw.githubusercontent.com/cbuijs/ut1/master/dating/domains.original', backup: 'hosts-backup/porn2/3.txt' },
        { url: 'https://raw.githubusercontent.com/cbuijs/ut1/master/sexual_education/domains.original', backup: 'hosts-backup/porn2/4.txt' }
    ],
    target: path.join('hosts', 'porn-2.txt')
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/4skinSkywalker/Anti-Porn-HOSTS-File/master/HOSTS.txt', backup: 'hosts-backup/porn3/1.txt' },
        { url: 'https://www.github.developerdan.com/hosts/lists/dating-services-extended.txt', backup: 'hosts-backup/porn3/2.txt' },
        { url: 'https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/CountryCodesLists/France.txt', backup: 'hosts-backup/porn3/3.txt' }
    ],
    target: path.join('hosts', 'porn-3.txt')
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/gambling.txt', backup: 'hosts-backup/gambling/1.txt' },
        { url: 'https://raw.githubusercontent.com/alsyundawy/TrustPositif/main/gambling_indonesia.txt', backup: 'hosts-backup/gambling/2.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/gambling-hosts.txt', backup: 'hosts-backup/gambling/3.txt' }
    ],
    target: path.join('hosts', 'gambling.txt')
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt', backup: 'hosts-backup/crypto/1.txt' },
        { url: 'https://v.firebog.net/hosts/Prigent-Crypto.txt', backup: 'hosts-backup/crypto/2.txt' },
        { url: 'https://zerodot1.gitlab.io/CoinBlockerLists/hosts', backup: 'hosts-backup/crypto/3.txt' },
        { url: 'https://zerodot1.gitlab.io/CoinBlockerLists/hosts_browser', backup: 'hosts-backup/crypto/4.txt' },
        { url: 'https://blocklistproject.github.io/Lists/crypto.txt', backup: 'hosts-backup/crypto/5.txt' }
    ],
    target: path.join('hosts', 'crypto.txt')
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/tiktok.txt', backup: 'hosts-backup/media/1.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/snapchat.txt', backup: 'hosts-backup/media/2.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/tiktok.txt', backup: 'hosts-backup/media/3.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/omegle.txt', backup: 'hosts-backup/media/4.txt' }
    ],
    target: path.join('hosts', 'media.txt')
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/marktron/fakenews/master/fakenews', backup: 'hosts-backup/junk/1.txt' },
        { url: 'https://blocklistproject.github.io/Lists/abuse.txt', backup: 'hosts-backup/junk/2.txt' },
        { url: 'https://urlhaus.abuse.ch/downloads/hostfile', backup: 'hosts-backup/junk/3.txt' },
        { url: 'https://blocklistproject.github.io/Lists/fraud.txt', backup: 'hosts-backup/junk/4.txt' }
    ],
    target: path.join('hosts', 'other-junk.txt')
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/croxtyl/pi-hole-block-list/main/myblocklist.txt', backup: 'hosts-backup/other.txt' }
    ],
    target: path.join('hosts', 'other.txt')
  },
];
//const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
const whitelistUrl = 'https://raw.githubusercontent.com/croxtyl/pi-hole-block-list/main/whitelist.txt';
const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

async function getData(url) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': userAgent }
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching ' + url + ': ' + err.message);
    return null;
  }
}

//function isInvalidContent(data) {
//  if (data.includes('<html>') || data.includes('</html>') || data.includes('<body>') || data.includes('<head>') || data.includes('<title>') || data.includes('<p>') || data.includes('<h1>')) {
//    return true;
//  }

//  if (data.trim().startsWith('{') || data.trim().startsWith('[')) {
//    return true;
//  }

//  if (data.toLowerCase().includes('not found')) {
//    return true;
//  }

//  const lines = data.split('\n');
//  for (const line of lines) {
//    const wordCount = line.trim().split(/\s+/).length;
//    if (wordCount > 3) {
//      return true;
//    }
// }

//  return false;
//}

function isInvalidContent(data) {
  const htmlIndicators = ['<html>', '</html>', '<body>', '<head>', '<title>', '<p>', '<h1>'];
  for (const tag of htmlIndicators) {
    if (data.includes(tag)) {
      return true;
    }
  }

  const trimmedData = data.trim();
  if (trimmedData.startsWith('{') || trimmedData.startsWith('[')) {
    return true;
  }

  if (data.includes('404 not found') || data.includes('521 server error') || data.toLowerCase().includes('not found')) {
    return true;
  }

function readLocalBackup(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error('Error reading local backup file ' + filePath + ': ' + err.message);
    return '';
  }
}

function cleanLine(line) {
  if (!line) return '';
  line = line.trim();

  line = line.replace(/^https?:\/\//, '').replace(/^http?:\/\//, '').replace(/^\|\|/, '').replace(/\^$/, '');

  line = line.split('/')[0].trim();

  line = line.replace(/[{}<>;=+|^\\]/g, '').trim();
  line = line.split('#')[0].trim();
  line = line.split('!')[0].trim();

  if (line.startsWith('#') || line.startsWith('!') || line === '') {
    return '';
  }

  return line;
}

function filterDomains(content) {
  let uniqueLines = new Set();
  const forbiddenChars = /[\\|[\]{};"'<>()*^=+]/;

  content.split('\n').forEach((line) => {
    line = cleanLine(line);
    if (line && !forbiddenChars.test(line)) {
      uniqueLines.add(line);
    }
  });

  return [...uniqueLines].join('\n');
}

async function getWhitelist() {
  let data = await getData(whitelistUrl);
  if (data === null) {
    console.error('Failed to fetch whitelist; it will be empty.');
    data = '';
  }
  data = data.trim().split('\n').map(line => cleanLine(line)).filter(line => line !== '');
  return new Set(data);
}

async function updateFilesAndCommit() {
  let whitelist = await getWhitelist();

  for (let fileSet of sourceFiles) {
    let content = '';
    for (let source of fileSet.urls) {
      let data = await getData(source.url);

      if (data === null || isInvalidContent(data)) {
        console.error('Using backup for ' + source.url);
        data = readLocalBackup(source.backup);
      }

      if (data) {
        content += data + '\n';
      }
    }

    let filteredContent = filterDomains(content);

    let finalContent = filteredContent.split('\n').filter(line => line && !whitelist.has(line)).join('\n') + '\n';

    fs.writeFileSync(fileSet.target, finalContent);
    console.log('Created hosts file ' + fileSet.target);
    console.log(`Total entries for ${fileSet.target}: ${finalContent.split('\n').length}`);
  }
}

updateFilesAndCommit();
