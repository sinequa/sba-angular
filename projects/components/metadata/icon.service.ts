import { Injectable } from '@angular/core';

const METADATA_MAPPINGS = {
  'far fa-flag': ['matchlocations'],
  'fas fa-map-marker-alt': ['geo'],
  'fas fa-user': ['person'],
  'fas fa-building': ['company'],
  'fas fa-tag': ['title'],
  'far fa-calendar-alt': ['modified'],
  'fas fa-weight-hanging': ['size'],
  'fas fa-folder-open': ['treepath'],
  'fas fa-user-edit': ['authors'],
  'fas fa-lock': ['accesslists'],
  'far fa-file': ['doctype', 'file'],
  'fas fa-globe-americas': ['documentlanguages'],
  'far fa-star': ['globalrelevance'],
  'fas fa-search': ['indexationtime'],
  'fas fa-tags': ['keywords'],
  'fas fa-align-left': ['matchingpartnames'],
  'fas fa-envelope': ['msgfrom'],
  'fas fa-envelope-open-text': ['msgto'],
  'far fa-file-alt': ['extractslocations', 'filename']
};

const FORMAT_MAPPINGS = {
  'fas fa-globe-europe': ['htm', 'html', 'xhtm', 'xhtml', 'mht'],
  'far fa-file-word': ['doc', 'docx', 'docm', 'dot', 'dotx', 'dotm', 'rtf', 'odt', 'ott', 'gdoc'],
  'far fa-file-excel': ['xls', 'xlsx', 'xlt', 'xltx', 'xlsm', 'xltm', 'gsheet', 'ods', 'ots'],
  'far fa-file-powerpoint': ['ppt', 'pptx', 'pptm', 'pps', 'ppsx', 'ppsm', 'pot', 'potx', 'potm', 'odp', 'otp', 'gslides'],
  'far fa-file-pdf': ['pdf'],
  'far fa-file-image': ['jpg', 'jpeg', 'bmp', 'tiff', 'tif', 'gif', 'png'],
  'far fa-file-video': ['mp4', 'flv', 'swf', 'mts', 'divx', 'wmv', 'avi', 'mov', 'mpg', 'mpeg', 'asf', 'rm'],
  'far fa-file-audio': ['mp3', 'wav', 'ogg', 'wma', 'aac', 'm3u'],
  'far fa-file-alt': ['extractslocations', 'filename', 'txt', 'text'],
  'far fa-file-code': ['xml', 'cs', 'java', 'cpp', 'c', 'h', 'hpp', 'js', 'ts'],
  'far fa-file-archive': ['zip', '7zip', '7z', 'rar', 'gz'],
  'fas fa-file-invoice': ['notes', 'quickr'],
  'far fa-envelope': ['email', 'mail', 'msg'],
  'far fa-database': ['mdb', 'odb', 'otb'],
  'fas fa-file-excel': ['xsn', 'gform'],
  'far fa-book': ['one'],
  'fas fa-file-medical-alt': ['odf', 'otf'],
  'far fa-object-group': ['vsdx', 'vsx', 'vtx', 'vdx', 'vssx', 'vstx', 'vsdm', 'vssm', 'vstm', 'vdw', 'vsd', 'vss', 'vst', '*file-odg', 'otg', 'gdraw', 'pub'],
  'far fa-users': ['ldap', 'ad'],
  'fas fa-file-medical': ['mmp', 'mppx']
}

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  getIcon(type: string): string | undefined {
    return this.getMappingIcon(METADATA_MAPPINGS, type);
  }

  getFormatIcon(format: string): string | undefined {
    return this.getMappingIcon(FORMAT_MAPPINGS, format);
  }

  private getMappingIcon(mappings: any, type: string): string | undefined {
    for (const key of Object.keys(mappings)) {
      if (mappings[key].find(((mappingType: string) => mappingType === type))) {
        return key;
      }
    }
    return undefined;
  }
}
