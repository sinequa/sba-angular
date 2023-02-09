import { Inject, Injectable, InjectionToken } from '@angular/core';


/**
 * METADATA_CONFIG can be provided in the forRoot method of the
 * In your app module, you can do like this example to replace the "docformat" metadata icon into a star,
 * and the "htm" doc format icon and color into a red lock:
        MetadataModule.forRoot({
            types: [
                {
                    type: 'docformat',
                    icon: 'far fa-star'
                }
            ],
            formats: [
                {
                    format: 'htm',
                    icon: 'fas fa-lock',
                    color: 'red'
                }
            ]
        })
  * The best being to setup a proper MetadataConfig object to inject
 */
export interface MetadataConfig {
  types?: MetadataConfigType[];
  formats?: MetadataConfigFormat[];
}
export const METADATA_CONFIG = new InjectionToken<MetadataConfig>('METADATA_CONFIG');

export interface MetadataConfigType {
  type: string;
  icon: string;
}

export interface MetadataConfigFormat {
  format: string;
  icon?: string;
  color?: string;
}

const DEFAULT_METADATA_MAPPINGS: any = {
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
  'far fa-file-alt': ['extractslocations', 'filename'],
  'fas fa-info-circle': ['docformat']
};

const DEFAULT_FORMAT_MAPPINGS: any = {
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

const DEFAULT_COLORS_MAPPINGS: any = {
  '#3f3fca': ['doc', 'docx', 'docm', 'dot', 'dotx', 'dotm', 'rtf'],
  'green': ['xls', 'xlsx', 'xlt', 'xltx', 'xlsm', 'xltm'],
  '#e64b30': ['ppt', 'pptx', 'pptm', 'pptm2', 'pps', 'ppsx', 'ppsm', 'pot', 'potx', 'potm'],
  '#ec2e2e': ['pdf'],
  '#202020': ['txt', 'text'],
  '#4545bf': ['jpg', 'jpeg', 'bmp', 'tiff', 'tif', 'gif', 'png', 'mp4', 'flv', 'swf', 'mts', 'divx', 'wmv', 'avi', 'mov', 'mpg', 'mpeg', 'asf', 'rm', 'htm', 'html', 'xhtm', 'xhtml', 'mht', 'xml', 'cs', 'java', 'cpp', 'c', 'h', 'hpp', 'js', 'ts'],
  'lightblue': ['mp3', 'wav', 'ogg', 'wma', 'aac', 'm3u'],
  'yellow': ['zip', '7zip', '7z', 'rar', 'gz'],
  'orange': ['notes', 'quickr', 'odg', 'otg', 'gslides'],
  'black': ['email', 'mail', 'msg'],
  'purple': ['mdb', 'xsn', 'one', 'vsdx', 'vsx', 'vtx', 'vdx', 'vssx', 'vstx', 'vsdm', 'vssm', 'vstm', 'vdw', 'vsd', 'vss', 'vst', 'gform'],
  'darkred': ['odb', 'otb'],
  'grey': ['odf', 'otf', 'odt', 'ott', 'mmp', 'mppx'],
  'red': ['odp', 'otp', 'gdraw'],
  'lightgreen': ['ods', 'ots'],
  'brown': ['ldap', 'ad'],
  'darkgreen': ['pub', 'gsheet'],
  'blue': ['gdoc']
};

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(@Inject(METADATA_CONFIG) public config: MetadataConfig) { }

  getIcon(type: string): string | undefined {
    const icon = this.config?.types?.find(t => t.type === type)?.icon;
    console.log('iconnn', icon, icon || this.getMappingIcon(DEFAULT_METADATA_MAPPINGS, type));
    return icon || this.getMappingIcon(DEFAULT_METADATA_MAPPINGS, type);
  }

  getFormatIcon(format: string): string | undefined {
    const icon = this.config?.formats?.find(t => t.format === format)?.icon;
    return icon || this.getMappingIcon(DEFAULT_FORMAT_MAPPINGS, format);
  }

  getColor(format: string): string | undefined {
    const color = this.config?.formats?.find(t => t.format === format)?.color;
    return color || this.getMappingIcon(DEFAULT_COLORS_MAPPINGS, format);
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
