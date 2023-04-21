import { Text, Row, Column } from 'react-basics';
import Link from 'next/link';
import classNames from 'classnames';
import ThemeButton from 'components/input/ThemeButton';
import LanguageButton from 'components/input/LanguageButton';
import ProfileButton from 'components/input/ProfileButton';
import styles from './NavBar.module.css';
import useConfig from 'hooks/useConfig';
import useMessages from 'hooks/useMessages';
import { useRouter } from 'next/router';
import HamburgerButton from '../common/HamburgerButton';

export default function NavBar() {
  const { pathname } = useRouter();
  const { cloudMode } = useConfig();
  const { formatMessage, labels } = useMessages();

  const links = [
    { label: formatMessage(labels.dashboard), url: '/dashboard' },
    { label: formatMessage(labels.realtime), url: '/realtime' },
    !cloudMode && { label: formatMessage(labels.settings), url: '/settings' },
  ].filter(n => n);

  return (
    <div className={classNames(styles.navbar)}>
      <Row>
        <Column className={styles.left}>
          <div className={styles.logo}>
            <img src="https://weiteo.menu/images/logo-md.png" width={30} height={27} alt="Logo" />
            <a href="https://weiteo.menu">
              <Text className={styles.weiteo}>ويتو منيو</Text>
            </a>
          </div>
          <div className={styles.links}>
            {links.map(({ url, label }) => {
              return (
                <Link
                  key={url}
                  href={url}
                  className={classNames({ [styles.selected]: pathname.startsWith(url) })}
                >
                  <Text>{label}</Text>
                </Link>
              );
            })}
          </div>
        </Column>
        <Column className={styles.right}>
          <div className={styles.actions}>
            <ThemeButton />
            <LanguageButton />
            <ProfileButton />
          </div>
          <div className={styles.mobile}>
            <HamburgerButton />
          </div>
        </Column>
      </Row>
    </div>
  );
}
