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
    target: path.join('hosts', 'ads.txt'),
    useWhitelist: true
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
    target: path.join('hosts', 'ads-2.txt'),
    useWhitelist: true
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
    target: path.join('hosts', 'ads-3.txt'),
    useWhitelist: true
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
    target: path.join('hosts', 'gen.txt'),
    useWhitelist: true
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
    target: path.join('hosts', 'gen-2.txt'),
    useWhitelist: true
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
    target: path.join('hosts', 'gen-3.txt'),
    useWhitelist: true
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
    target: path.join('hosts', 'gen-4.txt'),
    useWhitelist: true
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
    target: path.join('hosts', 'gen-5.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/piracy.txt', backup: 'hosts-backup/illegal/1.txt' },
        { url: 'https://blocklistproject.github.io/Lists/drugs.txt', backup: 'hosts-backup/illegal/2.txt' },
        { url: 'https://www.github.developerdan.com/hosts/lists/hate-and-junk-extended.txt', backup: 'hosts-backup/illegal/3.txt' }
    ],
    target: path.join('hosts', 'illegal.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/porn.txt', backup: 'hosts-backup/porn/1.txt' },
        { url: 'https://raw.githubusercontent.com/chadmayfield/my-pihole-blocklists/master/lists/pi_blocklist_porn_all.list', backup: 'hosts-backup/porn/2.txt' }
    ],
    target: path.join('hosts', 'porn.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://nsfw.oisd.nl', backup: 'hosts-backup/porn2/1.txt' },
        { url: 'https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/pornography-hosts', backup: 'hosts-backup/porn2/2.txt' },
        { url: 'https://raw.githubusercontent.com/cbuijs/ut1/master/dating/domains.original', backup: 'hosts-backup/porn2/3.txt' },
        { url: 'https://raw.githubusercontent.com/cbuijs/ut1/master/sexual_education/domains.original', backup: 'hosts-backup/porn2/4.txt' }
    ],
    target: path.join('hosts', 'porn-2.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/4skinSkywalker/Anti-Porn-HOSTS-File/master/HOSTS.txt', backup: 'hosts-backup/porn3/1.txt' },
        { url: 'https://www.github.developerdan.com/hosts/lists/dating-services-extended.txt', backup: 'hosts-backup/porn3/2.txt' },
        { url: 'https://raw.githubusercontent.com/deathbybandaid/piholeparser/master/Subscribable-Lists/CountryCodesLists/France.txt', backup: 'hosts-backup/porn3/3.txt' }
    ],
    target: path.join('hosts', 'porn-3.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/gambling.txt', backup: 'hosts-backup/gambling/1.txt' },
        { url: 'https://raw.githubusercontent.com/alsyundawy/TrustPositif/main/gambling_indonesia.txt', backup: 'hosts-backup/gambling/2.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/gambling-hosts.txt', backup: 'hosts-backup/gambling/3.txt' }
    ],
    target: path.join('hosts', 'gambling.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt', backup: 'hosts-backup/crypto/1.txt' },
        { url: 'https://v.firebog.net/hosts/Prigent-Crypto.txt', backup: 'hosts-backup/crypto/2.txt' },
        { url: 'https://zerodot1.gitlab.io/CoinBlockerLists/hosts', backup: 'hosts-backup/crypto/3.txt' },
        { url: 'https://zerodot1.gitlab.io/CoinBlockerLists/hosts_browser', backup: 'hosts-backup/crypto/4.txt' },
        { url: 'https://blocklistproject.github.io/Lists/crypto.txt', backup: 'hosts-backup/crypto/5.txt' }
    ],
    target: path.join('hosts', 'crypto.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://blocklistproject.github.io/Lists/tiktok.txt', backup: 'hosts-backup/media/1.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/snapchat.txt', backup: 'hosts-backup/media/2.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/tiktok.txt', backup: 'hosts-backup/media/3.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/omegle.txt', backup: 'hosts-backup/media/4.txt' }
    ],
    target: path.join('hosts', 'media.txt'),
    useWhitelist: false
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/marktron/fakenews/master/fakenews', backup: 'hosts-backup/junk/1.txt' },
        { url: 'https://blocklistproject.github.io/Lists/abuse.txt', backup: 'hosts-backup/junk/2.txt' },
        { url: 'https://urlhaus.abuse.ch/downloads/hostfile', backup: 'hosts-backup/junk/3.txt' },
        { url: 'https://blocklistproject.github.io/Lists/fraud.txt', backup: 'hosts-backup/junk/4.txt' }
    ],
    target: path.join('hosts', 'other-junk.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/croxtyl/pi-hole-block-list/main/myblocklist.txt', backup: 'hosts-backup/other.txt' }
    ],
    target: path.join('hosts', 'other.txt'),
    useWhitelist: true
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

    if (response.status >= 400 && response.status < 600) {
      console.error(`Error ${response.status} for ${url}`);
      return null;
    }

    return response.data;
  } catch (err) {
    console.error('Error fetching ' + url + ': ' + err.message);
    return null;
  }
}


function readLocalBackup(filePath, reason) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('Using backup for ' + filePath + ': ' + reason);
    return data;
  } catch (err) {
    console.error('Error reading local backup file ' + filePath + ': ' + err.message);
    return '';
  }
}

function cleanLine(line) {
  if (!line) return '';
  line = line.trim();

  line = line.split('#')[0].trim();
  line = line.split('!')[0].trim();

  if (line.startsWith('#') || line.startsWith('!') || line === '') {
    return '';
  }

  if (line.startsWith('0.0.0.0 ') || line.startsWith('127.0.0.1 ')) {
    return line.split(' ').slice(1).join(' ').trim();
  }

  return line;
}

async function getWhitelist() {
  let data = await getData(whitelistUrl);
  if (data === null) {
    console.error('Failed to fetch whitelist; it will be empty.');
    data = '';
  }
  return new Set(data.trim().split('\n').map(line => cleanLine(line).toLowerCase().replace(/\.$/, '')));
}

async function updateFilesAndCommit() {
  let whitelist = await getWhitelist();
  let totalEntries = 0;
  let totalRemoved = 0;
  let totalConverted = 0;

  for (let fileSet of sourceFiles) {
    let content = '';
    for (let source of fileSet.urls) {
      let data = await getData(source.url);

      if (data === null) {
        data = readLocalBackup(source.backup, 'Error fetching data');
      }

      if (data) {
        content += data + '\n';
      }
    }

    let lines = content.split('\n');
    let filteredLines = [];
    let removedLines = new Set();

    lines.forEach(line => {
      let cleanedLine = cleanLine(line);

      if (fileSet.useWhitelist) {
        if (cleanedLine && !whitelist.has(cleanedLine.toLowerCase().replace(/\.$/, ''))) {
          if (cleanedLine) {
            filteredLines.push(cleanedLine);
            totalConverted++;
          }
        } else if (cleanedLine) {
          removedLines.add(cleanedLine);
          totalRemoved++;
        }
      } else {
        if (cleanedLine) {
          filteredLines.push(cleanedLine);
          totalConverted++;
        }
      }
    });

    let finalContent = filteredLines.join('\n') + '\n';
    fs.writeFileSync(fileSet.target, finalContent);
    console.log('Created hosts file ' + fileSet.target);
    console.log(`Total entries for ${fileSet.target}: ${filteredLines.length}`);
    totalEntries += filteredLines.length;
  }

  console.log(`Total queries from all files: ${totalEntries}`);
  console.log(`Total lines removed: ${totalRemoved}`);
  console.log(`Total lines converted: ${totalConverted}`);
}

updateFilesAndCommit();
