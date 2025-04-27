import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  map: icon('ic_map'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  build: icon('ic_build'),
  kanban: icon('ic_kanban'),
  report: icon('ic_report'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  register: icon('ic_register'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------
function getPath(path, subheader) {
  const keys = path.split('.');
  let schema = paths[subheader];
  let keyValue = null;

  for (let i = 0; i < keys.length; i++) {
    let elem = keys[i];

    if (keyValue) {
      keyValue = keyValue[elem];
    } else {
      keyValue = schema[elem];
    }
  }

  return keyValue;
}

export function useNavData() {
  const { user } = useAuthContext();

  const data = useMemo(() => {
    if (user && user.profile) {
      return user.profile.menuJson.map((menu) => {
        return {
          items: menu.items.map((firstLevel) => {
            const childrenAlreadyExists = firstLevel.children && firstLevel.children.length > 0;

            return {
              path: firstLevel.path,
              title: firstLevel.title,
              icon: ICONS[firstLevel.icon],
              children: childrenAlreadyExists
                ? firstLevel.children.map((secondLevel) => {
                    const childrenAlreadyExists =
                      secondLevel.children && secondLevel.children.length > 0;

                    return {
                      path: secondLevel.path,
                      title: secondLevel.title,
                      children: childrenAlreadyExists
                        ? secondLevel.children.map((thirdLevel) => {
                            return {
                              path: thirdLevel.path,
                              title: thirdLevel.title,
                            };
                          })
                        : null,
                    };
                  })
                : null,
            };
          }),
        };
      });
    } else {
      return [];
    }
  }, [user]);

  return data;
}
