import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { stubFeaturesAndPermissions } from 'vault/tests/helpers/components/sidebar-nav';

const renderComponent = () => {
  return render(hbs`
    <Sidebar::Frame @isVisible={{true}}>
      <Sidebar::Nav::Cluster />
    </Sidebar::Frame>
  `);
};

module('Integration | Component | sidebar-nav-cluster', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render nav headings', async function (assert) {
    const headings = ['Vault', 'Replication', 'Monitoring'];
    stubFeaturesAndPermissions(this.owner, true, true);
    await renderComponent();

    assert
      .dom('[data-test-sidebar-nav-heading]')
      .exists({ count: headings.length }, 'Correct number of headings render');
    headings.forEach((heading) => {
      assert
        .dom(`[data-test-sidebar-nav-heading="${heading}"]`)
        .hasText(heading, `${heading} heading renders`);
    });
  });

  test('it should hide links and headings user does not have access too', async function (assert) {
    await renderComponent();
    // TODO: VAULT-17055 update this test once dashboard has localStorage set up!
    assert
      .dom('[data-test-sidebar-nav-link]')
      .exists({ count: 2 }, 'Nav links are hidden other than secrets and dashboard');
    assert
      .dom('[data-test-sidebar-nav-heading]')
      .exists({ count: 1 }, 'Headings are hidden other than Vault');
  });

  test('it should render nav links', async function (assert) {
    const links = [
      'Dashboard',
      'Secrets engines',
      'Access',
      'Policies',
      'Tools',
      'Disaster Recovery',
      'Performance',
      'Replication',
      'Raft Storage',
      'Client count',
      'License',
      'Seal Vault',
    ];
    stubFeaturesAndPermissions(this.owner, true, true);
    await renderComponent();

    assert
      .dom('[data-test-sidebar-nav-link]')
      .exists({ count: links.length }, 'Correct number of links render');
    links.forEach((link) => {
      assert.dom(`[data-test-sidebar-nav-link="${link}"]`).hasText(link, `${link} link renders`);
    });
  });
});